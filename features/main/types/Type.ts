export interface InitialUserState {
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export interface InitialServersState {
  serverId: string | null;
  serverName: string | null;
}

export interface InitialChannelState {
  channelId: string | null;
  channelName: string | null;
}

export interface InitialSerchState {
  inputValue: string | null;
  flag: boolean;
}
