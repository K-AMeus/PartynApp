package eu.partyn.app.mapper;


import eu.partyn.app.dto.EventDto;
import eu.partyn.app.model.Event;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "Spring")
public interface EventMapper {
    EventMapper INSTANCE = Mappers.getMapper(EventMapper.class);

    Event toEntity(EventDto eventDto);

    EventDto toDto(Event event);

    List<EventDto> toDtoList(List<Event> events);

}
