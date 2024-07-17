package eu.partyn.app.controller;

import eu.partyn.app.dto.EventDto;
import eu.partyn.app.mapper.EventMapper;
import eu.partyn.app.model.Event;
import eu.partyn.app.service.EventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;
    private final EventMapper eventMapper;
    private final ObjectMapper objectMapper;

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
    public ResponseEntity<EventDto> postEvent(@RequestPart("event") String eventString, @RequestPart("file") MultipartFile file) {
        try {
            EventDto eventDto = objectMapper.readValue(eventString, EventDto.class);
            Event event = eventMapper.toEntity(eventDto);
            event = eventService.postEvent(event, file);
            return ResponseEntity.ok(eventMapper.toDto(event));
        } catch (Exception e) {
            throw new RuntimeException("Error while posting event", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Integer id, @RequestPart("event") String eventString, @RequestPart("file") MultipartFile file) {
        try {
            EventDto eventDto = objectMapper.readValue(eventString, EventDto.class);
            eventDto.setId(id);
            Event eventToUpdate = eventMapper.toEntity(eventDto);
            Event updatedEvent = eventService.updateEvent(eventToUpdate, file);
            EventDto updatedEventDto = eventMapper.toDto(updatedEvent);
            return ResponseEntity.ok(updatedEventDto);
        } catch (Exception e) {
            throw new RuntimeException("Error while updating event", e);
        }
    }

}
