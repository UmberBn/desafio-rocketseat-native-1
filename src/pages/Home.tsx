import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  interface Task {
    id: number;
    title: string;
    done: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask : Task = {
      title: newTaskTitle,
      id: new Date().getTime(),
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex(({ id: taskID }) => id === taskID  );
    let copyTasksState = tasks;
    const updatedTask = tasks[taskIndex] = {
      ...tasks[taskIndex],
      done: !tasks[taskIndex].done,
    };

    copyTasksState[taskIndex] = updatedTask;

    setTasks([...copyTasksState]);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updatedState = tasks.filter(({id: taskID}) => id !== taskID );
    setTasks(updatedState);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})