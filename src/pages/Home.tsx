import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

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

    const existTask = tasks.find(({ title }) => title === newTaskTitle );

    if(existTask) {
      Alert.alert('Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome',
      );

      return ;
    }

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
    Alert.alert('Remover item',
    'Tem certeza que você deseja remover esse item?',
    [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'default',
        onPress: () => {
          const updatedState = tasks.filter(({id: taskID}) => id !== taskID );
          setTasks(updatedState);
        },
      },
    ])
  }

  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    const existTask = tasks.find(({ title }) => title === taskNewTitle );

    if(existTask) {
      Alert.alert('Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome',
      );

      return ;
    }

    const taskIndex = tasks.findIndex(({ id }) => id === taskId  );
    let copyTasksState = tasks;
    const updatedTask = tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: taskNewTitle,
    };

    copyTasksState[taskIndex] = updatedTask;

    setTasks([...copyTasksState]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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