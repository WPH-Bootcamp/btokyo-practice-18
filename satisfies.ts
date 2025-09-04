type Route = { path: `/${string}`; method: "GET" | "POST" };

const usersRoute = {
  path: "/users",
  method: "GET",
} satisfies Route;

const usersRoute2 = {
  path: "/users",
  method: "GET",
} as Route;

// Inferensi tetap tajam:
usersRoute.path;   // type: "/users"
usersRoute.method; // type: "GET"

console.log(usersRoute);
console.log(usersRoute2);

type Todo = {
  title: string;
  dueDate: string | Date;
  isComplete: boolean;
};

const todo = {
  title: 'sdf',
  dueDate: new Date(),
  isComplete: true,
} satisfies Todo;

console.log(typeof todo.dueDate); // "object"

todo.dueDate.getDate(); // Error: Property 'getDate' does not exist on type 'string | Date'.