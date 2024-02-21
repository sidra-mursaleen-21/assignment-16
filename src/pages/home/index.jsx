import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { onValue, push, ref, remove, set } from "firebase/database";
import { database } from "../../config/firebase";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [refrence, setRefrence] = useState([]);
  const [editInput, setEditInput] = useState();
  const [changeInput, setChangeInput] = useState();

  const sendMessage = () => {
    push(ref(database, "message/"), {
      messages: inputValue,
    });

    setInputValue("");
  };

  useEffect(() => {
    onValue(ref(database, "message/"), (snapshot) => {
      const data = snapshot.val();
      setChat(Object.values(data));
      setRefrence(Object.keys(data));
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < chat.length; i++) {
      chat[i].key = refrence[i];
      setMessages(chat);
    }
  });

  const editMassage = () => {
    set(ref(database, `message/${editInput.key}`), {
      messages: changeInput,
    });
  };

  const deleteMassage = (key) => {
    remove(ref(database, `message/${key}`));
  };

  return (
    <div className="chatBox">
      <div className="messageContaier">
        {messages.map((object, index) => {
          return (
            <div key={index} className="message">
              <p onClick={() => setIsOpen(true)}>{object.messages}</p>
              <div
                style={{
                  top: isOpen ? "0px" : "-35px",
                  display: isOpen ? "flex" : "none",
                }}
                className="deleteEdit"
              >
                <MdDelete
                  onClick={() => deleteMassage(object.key)}
                  cursor="pointer"
                />
                <CiEdit
                  onClick={() => {
                    setEdit(true);
                    setEditInput(object);
                    setChangeInput(editInput.messages);
                  }}
                  cursor="pointer"
                />
                <IoClose
                  onClick={() => {
                    setEdit(false);
                    setIsOpen(false);
                  }}
                  cursor="pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="messageInput">
        <input
          value={edit ? changeInput : inputValue}
          onChange={(e) => {
            edit
              ? setChangeInput(e.target.value)
              : setInputValue(e.target.value);
          }}
          placeholder="Write Your Message..."
          type="text"
        />
        {edit ? (
          <button onClick={() => editMassage()}>
            <CiEdit cursor="pointer" />
          </button>
        ) : (
          <button onClick={() => sendMessage()}>
            <FiSend />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
