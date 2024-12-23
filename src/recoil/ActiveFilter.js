import { atom } from 'recoil';

const ActiveFilter = atom({
    key: 'ActiveFilter',
    default: "All",
});

export default ActiveFilter;