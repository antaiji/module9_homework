const customJson = `
  {
    "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
    ]
  }
`;

console.log(JSON.parse(customJson));

// Additional
// const users = JSON.parse(customJson).list;

// for (let user of users) {
//   const newUser = {
//     name: user.name,
//     age: parseInt(user.age),
//     prof: user.prof,
//   };

//   console.log(newUser);
// }
