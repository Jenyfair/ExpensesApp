import { Icon } from "../../types/icon";

export interface IIconButton {
  icon: Icon;
  onPress?: () => void;
  isLogoutBtn?: boolean;
}
