package eu.partyn.app.service;

import com.google.cloud.storage.*;
import com.google.firebase.auth.FirebaseToken;
import eu.partyn.app.exception.EventNotFoundException;
import eu.partyn.app.model.Event;
import eu.partyn.app.repository.EventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    private final EventRepository eventRepository;
    private final Storage storage;
    private final SecurityService sercurityService;

    public List<Event> getAllEvents() {
        logger.info("Fetching all events");
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Integer id) {
        logger.info("Fetching event by id: {}", id);
        return eventRepository.findById(id);
    }

    public Event postEvent(FirebaseToken token, Event event, MultipartFile file) throws IOException{
        sercurityService.checkAdmin(token);

        logger.info("Posting new event: {}", event);
        if (file != null && !file.isEmpty()) {
            String fileName = uploadFile(file);
            event.setImageUrl(fileName);
        }
        return eventRepository.save(event);
    }

    public void deleteEvent(FirebaseToken token, Integer id) {
        sercurityService.checkAdmin(token);
        logger.info("Deleting event by id: {}", id);
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        eventRepository.delete(event);
    }

    public Event updateEvent(FirebaseToken token, Event event, MultipartFile file) throws IOException {
        sercurityService.checkAdmin(token);
        logger.info("Updating event: {}", event);
        Event existingEvent = eventRepository.findById(event.getId())
                .orElseThrow(() -> new EventNotFoundException(event.getId()));

        if (file != null && !file.isEmpty()) {
            String fileName = uploadFile(file);
            existingEvent.setImageUrl(fileName);
        }

        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDateTime(event.getDateTime());
        existingEvent.setEndDateTime(event.getEndDateTime());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setTopPick(event.getTopPick());
        existingEvent.setLocation(existingEvent.getLocation());

        return eventRepository.save(existingEvent);
    }

    private String uploadFile(MultipartFile file) throws IOException{
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        BlobId blobId = BlobId.of("partyn-79f01.appspot.com", "events/" + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();
        Blob blob = storage.create(blobInfo, file.getInputStream());

        storage.createAcl(blobId, Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

        return String.format("https://storage.googleapis.com/%s/%s", blobInfo.getBucket(), blobInfo.getName());
    }

    public void incrementLikes(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        event.setLikes(event.getLikes() + 1);
        eventRepository.save(event);
    }
}
