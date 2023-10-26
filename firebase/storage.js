import storage from '@react-native-firebase/storage'
export const uploadFile = async (uri, callback, name) => {
  const date = new Date()
  const ref = storage().ref(date + name)
  const task = ref.putFile(uri)
  task.on('state_changed', callback)
  return task
}