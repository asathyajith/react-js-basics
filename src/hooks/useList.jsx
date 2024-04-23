import {useState} from "react";

const useList = (init) => {
  const [list, setList] = useState(init);

  return {
    list,
    removeParent() {
      const final_list = list.filter((ele) => {
        return ele.rpm >= 5000;
      });

      setList(final_list);
    },
    removeChild(init) {
      const filtered_list = list.filter((v) => {
        return v.name !== init;
      });
      setList(filtered_list);
    },
    saveItem(index,newVal) {
      // eslint-disable-next-line no-unused-vars
      const copyList = [...list];
      init[index].name = newVal;
    },
  };
};

export default useList;
