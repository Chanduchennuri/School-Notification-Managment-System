get /user/session - get current user details
get /logout  - logout

--passport
/auth/google
/auth/google/callback

--admin routes
get /admin/teachers - get all teachers details
post /admin/teacher/create parameters-email fName lName phone
post /admin/teacher/update parameters-email fName lName phone --function updates fname lname and phone --key email

POST admin/teacher/class/add parameters- email clas --function adds the clas field to teacher
POST admin/teacher/class/remove parameters- email clas --function removes the clas field to teacher 


POST admin/class/create - create a class --parameter clas


post /admin/student/create parameters-email fName lName phone
post /admin/student/class/update parameters- email clas --function updates the class of a student
get /admin/students - get all students details
get /admin/students/:clas - get students details if particular class
post /admin/student/update parameters-email fName lName phone --function updates fname lname and phone --key email