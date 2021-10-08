import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'



interface Task {
  id: number;
  title: string;
  done: boolean;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  index: number;
}



export function TaskItem ({id, title, done, editTask, removeTask, toggleTaskDone, index}: Task)  {
 
  const [ editing, setEditing] = useState(false);
  const [ savePreviousName, setSavePreviousName] = useState<Task['title']>(title)
  const textInputRef = useRef<TextInput>(null)

  const handleStartEditing = () => {
    setEditing(!editing)
  }

  const handleCancelEditing = () => {
    setSavePreviousName(title);
    setEditing(false);
  }

  const handleSubmitEditing = () => {
    editTask(id, savePreviousName)
    setEditing(false)
  }

  useEffect(() => {
    if(editing) {
      textInputRef.current?.focus()
    } else {
      textInputRef.current?.blur()
    }
  }, [editing])


  return (
    <>
      <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(id)}
      >
        <View 
          testID={`marker-${index}`}
          style={done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>
        
        <TextInput 
          style={done ? styles.taskTextDone : styles.taskText}
          onChangeText={setSavePreviousName}
          value={savePreviousName}
          editable={editing}
          onSubmitEditing={() => handleSubmitEditing()}
          ref={textInputRef}
        />
    
      </TouchableOpacity>
    </View>
  
    <View style={styles.iconsArea}>
      { editing ? (
        <TouchableOpacity
        onPress={handleCancelEditing}
        >
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleStartEditing}
        >
          <Icon name="edit" size={24} color="#b2b2b2" />
        </TouchableOpacity>
      )}
      <View style={styles.buttonsWrapper}/>
      <TouchableOpacity
        testID={`trash-${index}`}
        onPress={() => removeTask(id)}
        disabled={editing}
        activeOpacity={editing ? 0.2 : 1}
      >
        <Icon name='trash' size={24} color="#b2b2b2" />
      </TouchableOpacity>  
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsArea: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonsWrapper: {
    width: 30,
    height: 3,
    marginVertical: 5,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }

})

export default TaskItem;