type UserApiResponse = {
  status: 'Error' | 'Success';
  data?: { id: string; name: string };
  errorMessage?: string;
};

// Kemungkinan A
// {
//     status: 'Success';
//     data: {id: 1, name: 'John'};
// }

// Kemungkinan B
// {
//     status: 'Error';
//     errorMessage: 'User not found';
// }

function handleResponse(res: UserApiResponse) {
  if (res.status === 'Success') {
    console.log(res.data.name); // Error: Property 'name' does not exist on type 'undefined'.
  } else {
    console.log(res.errorMessage.length); // Error: Property 'length' does not exist on type 'undefined'.
  }
}

type SuccessResponse = {
  status: 'Success';
  data: { id: string; name: string };
};

type ErrorResponse = {
  status: 'Error';
  errorMessage: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse2(res: ApiResponse) {
  if (res.status === 'Success') {
    console.log(res.data.name); // Tidak ada error, TypeScript tahu 'data' pasti ada
  } else {
    console.log(res.errorMessage.length); // Tidak ada error, TypeScript tahu 'errorMessage' pasti ada
  }
}