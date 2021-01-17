import { ChangeEvent, useCallback, useState } from "react";

export const useFileInput = () => {
  const [state, setState] = useState({
    coverImg: "",
    loading: false,
  });

  const reset = useCallback(
    () => setState({ coverImg: "", loading: false }),
    []
  );

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      const file = e.target.files && e.target.files[0];
      formData.append("file", file || "");

      setState({
        ...state,
        loading: true,
      });
      const { url } = await (
        await fetch("http://localhost:4000/uploads", {
          method: "post",
          body: formData,
        })
      ).json();

      setState({
        coverImg: url,
        loading: false,
      });
    },
    [state]
  );

  return {
    fileInput: state,
    onChangeFileInput: onChange,
    resetFileInput: reset,
  };
};
