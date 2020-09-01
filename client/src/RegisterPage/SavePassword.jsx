import React from "react";
import {
  Divider,
  Form,
  Button,
  Input,
  Loader,
  Grid,
  Segment,
  Dropdown,
  Modal,
  Accordion,
  Message,
  Icon,
  TextArea,
} from "semantic-ui-react";

const SavePassword = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal
        trigger={
          <Button basic color="red">
            Delete Test!
          </Button>
        }
        size="mini"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Are you sure you want to delete the test?</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>No</Button>
          {/* <Button color="red" onClick={() => deleteTest()}> */}
          Yes
          {/* </Button> */}
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SavePassword;
