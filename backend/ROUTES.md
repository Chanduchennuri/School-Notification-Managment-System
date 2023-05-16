get /user/session - get current user details
get /logout  - logout

--passport
/auth/google
/auth/google/callback

--admin routes
get /admin/teachers - get all teachers details
post /admin/teacher/create parameters-email fName lName phone
post /admin/teacher/update parameters-email fName lName phone --function updates fname lname and phone --key email

POST admin/teacher/class/add parameters- email class --function adds the clas field to teacher