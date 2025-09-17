import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'

const BACKGROUND_FETCH_TASK = 'background-fetch'

// 1. Define the task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now()

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  )

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData
})

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in screen components!
export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 1 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  })
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in screen components!
export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}
