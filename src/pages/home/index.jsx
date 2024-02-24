import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { onValue, push, ref, remove, set } from "firebase/database";
import { database } from "../../config/firebase";
import { useParams } from "react-router";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [refrence, setRefrence] = useState([]);
  const [editInput, setEditInput] = useState();
  const [changeInput, setChangeInput] = useState();

  const { username } = useParams();

  const sendMessage = () => {
    push(ref(database, "message/"), {
      messages: inputValue,
    });

    setInputValue("");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    renderChat();
  });

  const getData = () => {
    onValue(ref(database, "message/"), (snapshot) => {
      const data = snapshot.val();
      setChat(Object.values(data));
      setRefrence(Object.keys(data));
    });
  };

  const renderChat = () => {
    for (let i = 0; i < chat.length; i++) {
      chat[i].key = refrence[i];
      setMessages(chat);
    }
  };

  const editMassage = () => {
    set(ref(database, `message/${editInput.key}`), {
      messages: changeInput,
    });
    setInputValue("");
  };

  const deleteMassage = (key) => {
    remove(ref(database, `message/${key}`));
    getData();
    renderChat();
  };

  return (
    <div className="chatBox">
      <div className="profile">
        <div>
          <FaRegUser />
        </div>
        <p>{username}</p>
      </div>
      <div className="messageContaier">
        {messages.map((object, index) => {
          return (
            <div key={index} className="message">
              <div className="icon">
                <div>
                  <FaRegUser />
                </div>
                <p
                  onClick={() => {
                    setIsOpen(true);
                    styling(index);
                  }}
                >
                  {object.messages}
                </p>
              </div>
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
