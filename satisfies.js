var usersRoute = {
    path: "/users",
    method: "GET",
};
var usersRoute2 = {
    path: "/users",
    method: "GET",
};
// Inferensi tetap tajam:
usersRoute.path; // type: "/users"
usersRoute.method; // type: "GET"
console.log(usersRoute);
console.log(usersRoute2);
var todo = {
    title: 'sdf',
    dueDate: new Date(),
    isComplete: true,
};
console.log(typeof todo.dueDate); // "object"
// todo.dueDate.getDate(); // Error: Property 'getDate' does not exist on type 'string | Date'.
