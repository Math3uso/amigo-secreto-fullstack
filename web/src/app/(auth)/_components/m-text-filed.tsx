"use client";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    label?: string;
    placeholder?: string;
    password?: boolean;
    errorText?: string;
} & React.ComponentProps<typeof TextField>;

export const MTextField = ({ label, placeholder, password = false, errorText, error, type, ...rest }: Props) => {

    const [showPassword, SetShowPassword] = useState(password);

    return (
        <TextField
            helperText={errorText}
            {...rest}
            error={error}
            slotProps={{
            }} label={label} placeholder={placeholder} type={password ? showPassword ? "password" : "text" : type}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#8e51ff', // Cor da borda quando focado
                    },
                    '&.Mui-error.Mui-focused fieldset': {
                        borderColor: (theme) => theme.palette.error.main, // cor padrão de erro ao focar
                    },
                },
                '& label.Mui-focused': {
                    color: '#8e51ff', // cor do label quando o campo está focado
                },
                '& label.Mui-error.Mui-focused': {
                    color: (theme) => theme.palette.error.main, // cor do label quando erro + foco
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {password &&
                            <IconButton
                                onClick={() => SetShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Eye className="w-5 " /> : <EyeOff className="w-5 " />}
                            </IconButton>
                        }
                    </InputAdornment>
                ),
            }}
        >
        </TextField>
    );
}