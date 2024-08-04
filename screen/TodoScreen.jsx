import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import DraggableFlatList from "react-native-draggable-flatlist";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FallBack from "../component/Fallback";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // استيراد الأيقونات

const TODO_STORAGE_KEY = "todos";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // حالة البحث

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
      { id: Date.now().toString(), title: todo, completed: false },
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

  const toggleCompleted = (id) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    saveTodos(updatedTodoList);
  };

  const filteredTodoList = todoList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            backgroundColor: item.completed
              ? "#d3d3d3"
              : isActive
              ? "#0000ff"
              : "#1e90ff",
          },
        ]}
        onLongPress={drag}
        onPress={() => toggleCompleted(item.id)} // إضافة الحدث لتبديل الحالة عند الضغط
      >
        <Text
          style={[
            tw`text-white font-bold text-[20px] flex-1`,
            { textDecorationLine: item.completed ? "line-through" : "none" },
          ]}
        >
          {item.title}
        </Text>
        {item.completed && (
          <MaterialCommunityIcons name="check-circle" size={24} color="green" />
        )}
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
    <View style={tw`mx-4 android:mt-15`}>
      <TextInput
        style={tw`border-2 border-[#1e90ff] rounded-3 py-3 px-4 mb-4`}
        placeholder="Search Tasks"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TextInput
        style={tw`border-2 border-[#1e90ff] rounded-3 py-3 px-4 mb-4`}
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
        data={filteredTodoList}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          setTodoList(data);
          saveTodos(data);
        }}
      />
      {filteredTodoList.length <= 0 && <FallBack />}
    </View>
  );
};

export default TodoScreen;
