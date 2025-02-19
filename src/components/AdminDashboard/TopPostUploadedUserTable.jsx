import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TopPostUploadedUserTable = () => {
  return (
    <div className="px-10">
      <Table>
        <TableCaption>Most Post Contributer User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[100px]">Occurrence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Subodh</TableCell>
            <TableCell></TableCell>
            <TableCell>Rijal</TableCell>
            <TableCell>+977-9840780724</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TopPostUploadedUserTable;
