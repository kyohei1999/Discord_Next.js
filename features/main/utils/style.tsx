import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export const MyPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.common.white,
  },
}));

//ホバーメッセージのスタイル
export const HoverMessageIcon = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
