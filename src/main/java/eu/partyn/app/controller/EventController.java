package eu.partyn.app.controller;

import com.google.firebase.auth.FirebaseToken;
import eu.partyn.app.dto.EventDto;
import eu.partyn.app.mapper.EventMapper;
import eu.partyn.app.model.Event;
import eu.partyn.app.service.EventService;
import eu.partyn.app.service.FirebaseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;
    private final ObjectMapper objectMapper;
    private final FirebaseService firebaseService;
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        List<EventDto> eventDtos = events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(eventDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getSpecificEvent(@PathVariable Integer id) {
        return eventService.getEventById(id)
                .map(event -> ResponseEntity.ok(eventMapper.toDto(event)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EventDto> postEvent(@RequestHeader("Authorization") String idToken,
                                              @RequestPart("event") String eventString,
                                              @RequestPart("file") MultipartFile file) {
        try {
            FirebaseToken decodedToken = firebaseService.authenticate(idToken.replace("Bearer ", ""));
            EventDto eventDto = objectMapper.readValue(eventString, EventDto.class);
            Event event = eventMapper.toEntity(eventDto);
            event = eventService.postEvent(decodedToken, event, file);
            return ResponseEntity.ok(eventMapper.toDto(event));
        } catch (Exception e) {
            logger.error("Error posting event", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@RequestHeader("Authorization") String idToken, @PathVariable Integer id) {
        try {
            FirebaseToken decodedToken = firebaseService.authenticate(idToken.replace("Bearer ", ""));
            eventService.deleteEvent(decodedToken, id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting event", e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestHeader("Authorization") String idToken,
                                                @PathVariable Integer id,
                                                @RequestPart("event") String eventString,
                                                @RequestPart("file") MultipartFile file) {
        try {
            FirebaseToken decodedToken = firebaseService.authenticate(idToken.replace("Bearer ", ""));
            EventDto eventDto = objectMapper.readValue(eventString, EventDto.class);
            eventDto.setId(id);
            Event eventToUpdate = eventMapper.toEntity(eventDto);
            Event updatedEvent = eventService.updateEvent(decodedToken, eventToUpdate, file);
            return ResponseEntity.ok(eventMapper.toDto(updatedEvent));
        } catch (Exception e) {
            logger.error("Error updating event", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeEvent(@PathVariable Integer id, @RequestHeader("Authorization") String idToken) {
        try {
            FirebaseToken decodedToken = firebaseService.authenticate(idToken.replace("Bearer ", ""));
            eventService.incrementLikes(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error liking event", e);
            return ResponseEntity.status(500).build();
        }
    }
}
