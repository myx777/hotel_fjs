import { configureStore } from "@reduxjs/toolkit";
import * as reducer from "./reducer";

export const index = configureStore({reducer});
