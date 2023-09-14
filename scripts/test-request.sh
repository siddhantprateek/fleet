#!/bin/bash

num_requests=10

for ((i=1; i<=$num_requests; i++)); do
  name="example name$i"
  email="examplemail$i@gmail.com"
  password="examplepwd$i"
  role=("admin" "user" "dev")
  company=("flipkart" "amazon" "walmart" "ebay")
  random_index=$((RANDOM % ${#company[@]}))
  selected_company=${company[$random_index]}
  selected_role=${role[$random_index]}

  json_data='{
    "name": "'$name'",
    "email": "'$email'",
    "password": "'$password'",
    "role": "'$selected_role'",
    "company": "'$selected_company'"
  }'

  response=$(curl -X POST -H "Content-Type: application/json" -d "$json_data" http://localhost:8090/api/create)

  echo "Request $i:"
  echo "Response: $response"
  echo "-----------------------------------------"
done