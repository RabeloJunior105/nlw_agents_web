import dayjslib from "dayjs";
import "dayjs/locale/pt-BR";
import relativeTime from "dayjs/plugin/relativeTime";

dayjslib.locale('pt-BR')
dayjslib.extend(relativeTime)

export const dayjs = dayjslib