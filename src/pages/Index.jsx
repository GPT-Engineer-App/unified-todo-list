import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Select, Button, Checkbox, Text, Box, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', priority: 'Medium' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = () => {
    if (newTask.description.trim() === '') return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { ...newTask, completed: false }]);
    }
    setNewTask({ description: '', priority: 'Medium' });
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Task Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <Select name="priority" value={newTask.priority} onChange={handleInputChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'}</Button>
        </HStack>
        <VStack width="100%" spacing={3}>
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" p={2} borderWidth={1} borderRadius="md" justifyContent="space-between">
              <Checkbox isChecked={task.completed} onChange={() => toggleComplete(index)}>
                <Text as={task.completed ? 's' : ''}>{task.description}</Text>
              </Checkbox>
              <Text>{task.priority}</Text>
              <HStack>
                <IconButton icon={<FaEdit />} onClick={() => editTask(index)} />
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(index)} />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;