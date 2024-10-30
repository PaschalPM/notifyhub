const generateRoomID = ({user1Id, user2Id}) => {
    const sortedUserIds = [user1Id, user2Id].sort()
    return `room_${sortedUserIds.join('_')}`;
}

export default { generateRoomID }