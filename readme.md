## Endpoints:
## Create User:
POST - https://chatapp-backend-dusky.vercel.app/users/create-user
Body: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  date_of_birth: string;
  password: string;
  photo_url: string (OPTIONAL)
}

## Login User
POST - https://chatapp-backend-dusky.vercel.app/users/log-in
Body: {
    email: string,
    password: string
}


## Get Users
GET - https://chatapp-backend-dusky.vercel.app/users

## Filter Users
GET - https://chatapp-backend-dusky.vercel.app/users?search=
Params: { search: string }


## Get User By Id
GET - https://chatapp-backend-dusky.vercel.app/users/:id
Params: {id: string}


## Delete User By Id
DELETE - https://chatapp-backend-dusky.vercel.app/users/:id
Params: {id: string}

## Upadate User By Id
PATCH -  https://chatapp-backend-dusky.vercel.app/users/:id
Param: {id: string}
body: {
  first_name: string  (OPTIONAL);
  last_name: string  (OPTIONAL);
  username: string  (OPTIONAL);
  email: string  (OPTIONAL);
  gender: string (OPTIONAL);
  date_of_birth: string  (OPTIONAL); 
  password: string  (OPTIONAL);
  photo_url: string (OPTIONAL)
}