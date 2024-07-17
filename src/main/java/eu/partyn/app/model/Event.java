package eu.partyn.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


/**
 * Entity representing an event.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "Event name cannot be blank")
    private String name;

    @NotNull(message = "Date and time cannot be null")
    private LocalDateTime dateTime;

    @NotNull(message = "Ticket price cannot be null")
    @Min(0)
    private Integer ticketPrice;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Location cannot be blank")
    private String location;

    @NotNull(message = "Top pick status cannot be null")
    private Boolean topPick;

    private String imageUrl;

}
