package eu.partyn.app.service;

import eu.partyn.app.exception.EventNotFoundException;
import eu.partyn.app.model.Event;
import eu.partyn.app.repository.EventRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventService {
    private final EventRepository eventRepository;
    private final Path root = Paths.get("uploads");

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!", e);
        }
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public Event postEvent(Event event, MultipartFile file) {
        try {
            if (file != null && !file.isEmpty()) {
                Path filePath = this.root.resolve(file.getOriginalFilename());
                if (!Files.exists(filePath)) {
                    Files.copy(file.getInputStream(), filePath);
                }
                event.setImageUrl("/uploads/" + file.getOriginalFilename());
            }
            return eventRepository.save(event);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    public void deleteEvent(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        eventRepository.delete(event);
    }

    public Event updateEvent(Event event, MultipartFile file) {
        Event existingEvent = eventRepository.findById(event.getId())
                .orElseThrow(() -> new EventNotFoundException(event.getId()));

        if (file != null && !file.isEmpty()) {
            try {
                Path filePath = this.root.resolve(file.getOriginalFilename());
                if (!Files.exists(filePath)) {
                    Files.copy(file.getInputStream(), filePath);
                }
                existingEvent.setImageUrl("/uploads/" + file.getOriginalFilename());
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
            }
        }

        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDateTime(event.getDateTime());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setTopPick(event.getTopPick());
        existingEvent.setLocation(event.getLocation());

        return eventRepository.save(existingEvent);
    }
}
