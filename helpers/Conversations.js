export const Conversations = [
    {
      withUserId: 1,
      messages: [
        {
          id: 0,
          type: 'out',
          time: -300,
          text: 'Hey, how’ve you been?',
        },
        {
          id: 1,
          time: -240,
          type: 'in',
          text: 'Awesome! Thank you! How about you?',
        }],
    },
    {
      withUserId: 5,
      messages: [
        {
          id: 0,
          type: 'out',
          time: -300,
          text: 'I have no idea what to buy for Mary for her birthday.',
        },
        {
          id: 1,
          time: -240,
          type: 'in',
          text: 'Me, neither! Would you like to go in and buy her a gift together?',
        },
        {
          id: 2,
          time: -100,
          type: 'out',
          text: 'If I remember right, she likes music, skiing, and reading',
        },
        {
          id: 3,
          time: -45,
          type: 'out',
          text: 'You know, maybe we could get her some concert tickets. Who would know her favorite groups?',
        },
        {
          id: 4,
          time: -25,
          type: 'in',
          text: 'Her roommate, Malia, might know what her favorite groups are.',
        },
        {
          id: 5,
          time: -5,
          type: 'out',
          text: 'Cool! Let\'s give Malia a call and ask her for her help right now',
        }],
    },
  ];
  
  export default Conversations;