/*
This is an example snippet - you should consider tailoring it
to your service.
*/

export async function queryHasuraGQL(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      "content-type": "applicaton/json",
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY,
    },
  });

  return await result.json();
}

const operationsDoc = `
    query MyQuery {
      myusers {
        email
        id
        issuer
        publicAddress
      }
      stats {
        favourite
        id
        userId
        videoId
        watched
      }
    }
    
    mutation MyMutation {
      insert_stats_one(object: {favourite: 10, id: 111, userId: "skj", videoId: "4zH5iYM4wJo", watched: false}) {
        watched
        videoId
        userId
        id
        favourite
      }
    }
  `;

// function fetchMyQuery() {
//   return queryHasuraGQL(operationsDoc, "MyQuery", {});
// }

// function executeMyMutation() {
//   return queryHasuraGQL(operationsDoc, "MyMutation", {});
// }

// export async function startFetchMyQuery() {
//   const { errors, data } = await fetchMyQuery();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }

// async function startExecuteMyMutation() {
//   const { errors, data } = await executeMyMutation();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }

// startExecuteMyMutation();
