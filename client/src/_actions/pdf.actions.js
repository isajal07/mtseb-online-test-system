import { userService } from '../_services';

export const pdfActions = {
  profileCard,
  teacherCard
}

//Action to create and download profilecard
function profileCard(user) {
  return async dispatch =>
  userService.profileCard(user)
    .then(console.log('Profile card download success!'))
    .catch(error => console.log(error))
}

//Action to create and download for teacher
function teacherCard(user) {
  return async dispatch =>
  userService.teacherCard(user)
    .then(console.log('Profile card download success!'))
    .catch(error => console.log(error))
}


