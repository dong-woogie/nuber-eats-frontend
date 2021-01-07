import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export interface IForm {
  term: string;
}

function SearchForm() {
  const { register, handleSubmit, getValues } = useForm<IForm>();
  const history = useHistory();
  const onSubmit = () => {
    const { term } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${term}`,
    });
  };
  return (
    <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute text-xl left-5 top-5"
      />
      <input
        ref={register({ required: true })}
        name="term"
        type="Search"
        className="search"
        placeholder="what are you craving?"
      />
    </form>
  );
}

export default SearchForm;
