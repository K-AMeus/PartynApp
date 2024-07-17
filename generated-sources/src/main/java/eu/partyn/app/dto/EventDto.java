package eu.partyn.app.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * EventDto
 */
@lombok.Builder
@lombok.AllArgsConstructor

@JsonTypeName("Event")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.4.0")
public class EventDto {

  private Integer id;

  private String name;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime dateTime;

  private Integer ticketPrice;

  private String description;

  private String location;

  private Boolean topPick;

  private String imageUrl;

  public EventDto() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public EventDto(String name, LocalDateTime dateTime, Integer ticketPrice, String description, String location, Boolean topPick) {
    this.name = name;
    this.dateTime = dateTime;
    this.ticketPrice = ticketPrice;
    this.description = description;
    this.location = location;
    this.topPick = topPick;
  }

  public EventDto id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  
  @JsonProperty("id")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public EventDto name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  @NotNull 
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public EventDto dateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
    return this;
  }

  /**
   * Get dateTime
   * @return dateTime
  */
  @NotNull @Valid 
  @JsonProperty("dateTime")
  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }

  public EventDto ticketPrice(Integer ticketPrice) {
    this.ticketPrice = ticketPrice;
    return this;
  }

  /**
   * Get ticketPrice
   * @return ticketPrice
  */
  @NotNull 
  @JsonProperty("ticketPrice")
  public Integer getTicketPrice() {
    return ticketPrice;
  }

  public void setTicketPrice(Integer ticketPrice) {
    this.ticketPrice = ticketPrice;
  }

  public EventDto description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
  */
  @NotNull 
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public EventDto location(String location) {
    this.location = location;
    return this;
  }

  /**
   * Get location
   * @return location
  */
  @NotNull 
  @JsonProperty("location")
  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public EventDto topPick(Boolean topPick) {
    this.topPick = topPick;
    return this;
  }

  /**
   * Get topPick
   * @return topPick
  */
  @NotNull 
  @JsonProperty("topPick")
  public Boolean getTopPick() {
    return topPick;
  }

  public void setTopPick(Boolean topPick) {
    this.topPick = topPick;
  }

  public EventDto imageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
  */
  
  @JsonProperty("imageUrl")
  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    EventDto event = (EventDto) o;
    return Objects.equals(this.id, event.id) &&
        Objects.equals(this.name, event.name) &&
        Objects.equals(this.dateTime, event.dateTime) &&
        Objects.equals(this.ticketPrice, event.ticketPrice) &&
        Objects.equals(this.description, event.description) &&
        Objects.equals(this.location, event.location) &&
        Objects.equals(this.topPick, event.topPick) &&
        Objects.equals(this.imageUrl, event.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, dateTime, ticketPrice, description, location, topPick, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class EventDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    dateTime: ").append(toIndentedString(dateTime)).append("\n");
    sb.append("    ticketPrice: ").append(toIndentedString(ticketPrice)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    location: ").append(toIndentedString(location)).append("\n");
    sb.append("    topPick: ").append(toIndentedString(topPick)).append("\n");
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

