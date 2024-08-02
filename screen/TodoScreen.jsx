import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import DraggableFlatList from "react-native-draggable-flatlist";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FallBack from "../component/Fallback";

const TODO_STORAGE_KEY = "todos";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        if (storedTodos) {
          setTodoList(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos from AsyncStorage", error);
      }
    };
    loadTodos();
  }, []);

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to AsyncStorage", error);
    }
  };

  const handelAddTodo = async () => {
    const newTodoList = [
      ...todoList,
      { id: Date.now().toString(), title: todo },
    ];
    setTodoList(newTodoList);
    setTodo("");
    await saveTodos(newTodoList);
  };

  const handelDeleteTodo = async (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    await saveTodos(updatedTodoList);
  };

  const handelEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handelUpdateTodo = async () => {
    const updatedTodoList = todoList.map((data) => {
      if (data.id === editedTodo.id) {
        return { ...data, title: todo };
      }
      return data;
    });
    setTodoList(updatedTodoList);
    setEditedTodo(null);
    setTodo("");
    await saveTodos(updatedTodoList);
  };

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          tw`bg-[#1e90ff] rounded-3 px-3 py-3 mb-3 flex-row items-center`,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3,
            backgroundColor: isActive ? "#0000ff" : "#1e90ff",
          },
        ]}
        onLongPress={drag}
      >
        <Text style={[tw`text-white font-bold text-[20px] flex-1`]}>
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#FFF"
          onPress={() => handelEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#FFF"
          onPress={() => handelDeleteTodo(item.id)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`mx-4`}>
      <TextInput
        style={tw`border-2 border-[#1e90ff] rounded-3 py-3 px-4`}
        placeholder="Add a Task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {editedTodo ? (
        <TouchableOpacity
          style={tw`bg-[#000] rounded-3 py-3 my-8`}
          onPress={() => handelUpdateTodo()}
          disabled={todo.length === 0}
        >
          <Text style={tw`text-white font-bold text-[20px] text-center`}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`bg-[#000] rounded-3 py-3 my-8`}
          onPress={() => handelAddTodo()}
          disabled={todo.length === 0}
        >
          <Text style={tw`text-white font-bold text-[20px] text-center`}>
            Add
          </Text>
        </TouchableOpacity>
      )}
      <DraggableFlatList
        data={todoList}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          setTodoList(data);
          saveTodos(data);
        }}
      />
      {todoList.length <= 0 && <FallBack />}
    </View>
  );
};

export default TodoScreen;