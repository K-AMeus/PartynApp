package service;

import com.google.cloud.storage.Storage;
import com.google.firebase.auth.FirebaseToken;
import eu.partyn.app.model.Event;
import eu.partyn.app.repository.EventRepository;
import eu.partyn.app.service.EventService;
import eu.partyn.app.service.SecurityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.multipart.MultipartFile;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private SecurityService securityService;

    @Mock
    private Storage storage;

    @InjectMocks
    private EventService eventService;

    @Mock
    private FirebaseToken firebaseToken;

    @Mock
    private MultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAdminCanPostEvent() throws Exception {
        Event event = new Event();
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        eventService.postEvent(firebaseToken, event, file);

        verify(securityService, times(1)).checkAdmin(firebaseToken);
        verify(eventRepository, times(1)).save(any(Event.class));
    }

    @Test
    void testNonAdminCannotPostEvent() {
        doThrow(new AccessDeniedException("User is not authorized")).when(securityService).checkAdmin(firebaseToken);

        Event event = new Event();
        assertThrows(AccessDeniedException.class, () -> eventService.postEvent(firebaseToken, event, file));

        verify(eventRepository, times(0)).save(any(Event.class));
    }

    @Test
    void testAdminCanDeleteEvent() {
        Event event = new Event();
        when(eventRepository.findById(anyInt())).thenReturn(Optional.of(event));

        eventService.deleteEvent(firebaseToken, 1);

        verify(securityService, times(1)).checkAdmin(firebaseToken);
        verify(eventRepository, times(1)).delete(any(Event.class));
    }

    @Test
    void testNonAdminCannotDeleteEvent() {
        doThrow(new AccessDeniedException("User is not authorized")).when(securityService).checkAdmin(firebaseToken);

        assertThrows(AccessDeniedException.class, () -> eventService.deleteEvent(firebaseToken, 1));

        verify(eventRepository, times(0)).delete(any(Event.class));
    }

    @Test
    void testAdminCanUpdateEvent() throws Exception {
        Event event = new Event();
        event.setId(1);
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        eventService.updateEvent(firebaseToken, event, file);

        verify(securityService, times(1)).checkAdmin(firebaseToken);
        verify(eventRepository, times(1)).save(any(Event.class));
    }

    @Test
    void testNonAdminCannotUpdateEvent() {
        doThrow(new AccessDeniedException("User is not authorized")).when(securityService).checkAdmin(firebaseToken);

        Event event = new Event();
        assertThrows(AccessDeniedException.class, () -> eventService.updateEvent(firebaseToken, event, file));

        verify(eventRepository, times(0)).save(any(Event.class));
    }

    @Test
    void testUserCanIncrementLikes() {
        Event event = new Event();
        event.setLikes(0);
        when(eventRepository.findById(anyInt())).thenReturn(Optional.of(event));

        eventService.incrementLikes(1);

        assertEquals(1, event.getLikes());
        verify(eventRepository, times(1)).save(any(Event.class));
    }
}

