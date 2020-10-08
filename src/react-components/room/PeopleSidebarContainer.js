import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PeopleSidebar } from "./PeopleSidebar";
import { getMicrophonePresences } from "../../utils/microphone-presence";
import { navigateToClientInfo } from "../presence-list";

function usePeopleList(presences, mySessionId, micUpdateFrequency = 500) {
  const [people, setPeople] = useState([]);

  useEffect(
    () => {
      let timeout;

      function updateMicrophoneState() {
        const micPresences = getMicrophonePresences();

        setPeople(
          Object.entries(presences).map(([id, presence]) => {
            const meta = presence.metas[presence.metas.length - 1];
            const micPresence = micPresences.get(id);
            return { id, isMe: mySessionId === id, micPresence, ...meta };
          })
        );

        timeout = setTimeout(updateMicrophoneState, micUpdateFrequency);
      }

      updateMicrophoneState();

      return () => {
        clearTimeout(timeout);
      };
    },
    [presences, micUpdateFrequency, setPeople, mySessionId]
  );

  return people;
}

export function PeopleSidebarContainer({ history, presences, mySessionId, onOpenAvatarSettings, onClose }) {
  const people = usePeopleList(presences, mySessionId);

  // TODO: Dont use state routes for profiles
  const onSelectPerson = useCallback(
    person => {
      if (person.id === mySessionId) {
        onOpenAvatarSettings();
      } else if (!person.context.discord) {
        navigateToClientInfo(history, person.id);
      }
    },
    [history, mySessionId, onOpenAvatarSettings]
  );

  return <PeopleSidebar people={people} onSelectPerson={onSelectPerson} onClose={onClose} />;
}

PeopleSidebarContainer.propTypes = {
  history: PropTypes.object.isRequired,
  onOpenAvatarSettings: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  mySessionId: PropTypes.string.isRequired,
  presences: PropTypes.array.isRequired
};