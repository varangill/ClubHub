import Dropdown from "react-bootstrap/Dropdown";
import { postData, getData, deleteData } from "../api";
import { useEffect, useState } from "react";

export default function ClubTagsDropdown(props) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    updateTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTags = () => {
    getData(`tags`).then((allTags) => {
      getData(`tags/club/${props.clubId}`).then((clubTags) => {
        const updatedTags = allTags.map((tag) => ({
          ...tag,
          isSelected: clubTags.some((clubTag) => clubTag.id === tag.id),
        }));
        setTags(updatedTags);
      });
    });
  };

  const onClickItem = (tag) => {
    if (tag["isSelected"]) {
      //If tag is already selected, unselect it
      deleteData(`tags`, {
        clubId: props.clubId,
        tagId: tag["id"],
      }).then(() => {
        updateTags();
      });
    } else {
      //If tag is not selected, select it
      postData(`tags`, {
        clubId: props.clubId,
        tagId: tag["id"],
      }).then(() => {
        updateTags();
      });
    }
  };

  return (
    <Dropdown autoClose="outside" style={{padding: 0, marginLeft: 0}}>
      <Dropdown.Toggle>Choose Tags</Dropdown.Toggle>

      <Dropdown.Menu>
        {tags.map((tag) => (
          <Dropdown.Item
            key={tag["id"]}
            className={tag["isSelected"] ? "selected-tag" : ""}
            onClick={() => onClickItem(tag)}
          >
            {tag["tagName"]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
