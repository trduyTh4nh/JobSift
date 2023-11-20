import { registerSheet } from "react-native-actions-sheet";
import ApplySheet from "./Job/ApplySheet";
import SearchActionSheet from "./components/SearchActionSheet";

registerSheet('apply-sheet', ApplySheet)
registerSheet('search-sheet', SearchActionSheet)
export {}