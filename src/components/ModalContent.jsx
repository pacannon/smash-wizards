import React from "react";
import { SkillTreeGroup, SkillTree, SkillProvider } from "beautiful-skill-tree";
import Defense from "./skills/Defense";
import Health from "./skills/Health";
import Shot from "./skills/Shot";
import Sword from "./skills/Sword";

const skillCollection = [Defense, Health, Shot, Sword];

const ModalContent = () => {
  return (
    <SkillProvider>
      <SkillTreeGroup>
        {({ skillCount }) => (
          <>
            {skillCollection.map(({ id, skills }) => (
              <SkillTree treeId={id} title={`${id} Skills`} data={skills} />
            ))}
          </>
        )}
      </SkillTreeGroup>
    </SkillProvider>
  );
};

export default ModalContent;
