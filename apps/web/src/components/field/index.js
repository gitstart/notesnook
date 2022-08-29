import React, { useState } from "react";
import { Button, Flex, Text } from "@streetwriters/rebass";
import { Input, Label } from "@streetwriters/rebass-forms";
import * as Icon from "../icons";

const passwordValidationRules = [
  {
    title: "8 characters",
    validate: (password) => password.length >= 8
  }
  // {
  //   title: "1 lowercase letter",
  //   validate: (password) => /[a-z]/.test(password),
  // },
  // {
  //   title: "1 uppercase letter",
  //   validate: (password) => /[A-Z]/.test(password),
  // },
  // {
  //   title: "1 digit",
  //   validate: (password) => /\d/.test(password),
  // },
  // {
  //   title: "1 special character",
  //   validate: (password) => /\W/.test(password),
  // },
];

function Field(props) {
  const {
    id,
    label,
    type,
    sx,
    styles = {},
    name,
    required,
    autoFocus,
    autoComplete,
    helpText,
    action,
    onKeyUp,
    onKeyDown,
    onChange,
    inputRef,
    disabled,
    defaultValue,
    placeholder,
    validatePassword,
    onError,
    inputMode,
    pattern,
    variant = "input",
    as = "input"
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rules, setRules] = useState(passwordValidationRules);

  return (
    <Flex sx={{ ...sx, ...styles.container }} flexDirection="column">
      <Label
        htmlFor={id}
        sx={{
          fontSize: "subtitle",
          fontWeight: "bold",
          color: "icon",
          flexDirection: "column",
          ...styles.label
        }}
      >
        {label}{" "}
        {helpText && (
          <Text
            as="span"
            sx={{
              fontSize: "subBody",
              fontWeight: "normal",
              color: "fontTertiary",
              ...styles.helpText
            }}
          >
            {helpText}
          </Text>
        )}
      </Label>

      <Flex mt={1} sx={{ position: "relative" }}>
        <Input
          as={as}
          data-test-id={props["data-test-id"]}
          variant={variant}
          defaultValue={defaultValue}
          ref={inputRef}
          autoFocus={autoFocus}
          required={required}
          name={name}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
          type={type || "text"}
          sx={{
            ...styles.input,
            ":disabled": {
              bg: "bgSecondary"
            }
          }}
          onChange={(e) => {
            if (validatePassword) {
              const value = e.target.value;
              const mapped = rules.map((rule) => {
                return { ...rule, isValid: rule.validate(value) };
              });
              if (onError) {
                onError(mapped.some((m) => !m.isValid));
              }
              setRules(mapped);
            }
            if (onChange) onChange(e);
          }}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
        />
        {type === "password" && (
          <Flex
            onClick={() => {
              const input = document.getElementById(id);
              if (!input) return;
              input.type = isPasswordVisible ? "password" : "text";
              setIsPasswordVisible((s) => !s);
            }}
            variant="rowCenter"
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              px: 2,
              cursor: "pointer",
              borderTopRightRadius: "default",
              borderBottomRightRadius: "default",
              ":hover": { bg: "border" }
            }}
          >
            {isPasswordVisible ? (
              <Icon.PasswordVisible />
            ) : (
              <Icon.PasswordInvisible />
            )}
          </Flex>
        )}
        {action && (
          <Button
            type="button"
            variant={"secondary"}
            data-test-id={action.testId}
            onClick={action.onClick}
            sx={{
              position: "absolute",
              right: "2px",
              top: "2px",
              cursor: "pointer",
              bottom: "2px",
              px: 1,
              borderRadius: "default",
              ":hover": { bg: "border" }
            }}
            disabled={action.disabled}
          >
            {action.component ? action.component : <action.icon size={20} />}
          </Button>
        )}
      </Flex>
      {validatePassword && (
        <Flex flexDirection="column" mt={1}>
          {rules.map((rule) => (
            <Flex>
              {rule.isValid ? (
                <Icon.Check color="success" size={14} />
              ) : (
                <Icon.Cross color="error" size={14} />
              )}
              <Text fontSize="body" color="text" ml={1}>
                {rule.title}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default Field;
