import update from 'immutability-helper';

export default {
  mutations: {
    SetUserStatus: ({variables: {status, userId}}) => ({
      updateQueries: {
        TalkAdmin_FlaggedAccounts: (prev) => {
          if (status !== 'APPROVED') {
            return prev;
          }
          const updated = update(prev, {
            users: {
              nodes: {$apply: (nodes) => nodes.filter((node) => node.id !== userId)},
            },
          });
          return updated;
        }
      }
    }),
    RejectUsername: ({variables: {input: {id: userId}}})  => ({
      updateQueries: {
        TalkAdmin_FlaggedAccounts: (prev) => {
          const updated = update(prev, {
            users: {
              nodes: {$apply: (nodes) => nodes.filter((node) => node.id !== userId)},
            },
          });
          return updated;
        }
      }
    }),
  },
};

