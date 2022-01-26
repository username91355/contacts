export const generateID = (busyIdArray: number[], id: number = 1): number => {
    return (busyIdArray.some(i => +i === +id))
        ? generateID(busyIdArray,id + 1)
        : id;
};