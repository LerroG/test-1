export interface IFullResponse {
  avgAdminTime: string;
  avgWaitTime: string;
  branchInfos: BranchInfo[];
  code: number;
  givenTickets: number;
  givenTicketsByBranchGraph: GivenTicketsByBranchGraph;
  givenTicketsByBranchHourly: GivenTicketsByBranchHourly;
  missingClients: number;
  msg: string;
  servedTaskCount: number;
}

export interface BranchInfo {
  avgAdminTime: string;
  avgWaitTime: string;
  branchName: string;
  givenTickets: number;
  missingClients: number;
  servedTaskCount: number;
  serviceData?: BranchInfo[];
  serviceName?: string;
}

export interface GivenTicketsByBranchGraph {
  items: IGivenTicketsByBranchGraphItem[];
}

export interface IGivenTicketsByBranchGraphItem {
  BranchName: string;
  TicketCount: number;
  TicketCountPercent: string;
}

export interface GivenTicketsByBranchHourly {
  clientsPerHour: ClientsPerHour[];
}

export interface ClientsPerHour {
  Name: string;
  hourList: HourList[];
}

export interface HourList {
  count: number;
  hour: string;
}
