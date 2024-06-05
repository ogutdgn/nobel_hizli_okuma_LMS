import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useUserCalls from "../service/useUserCalls";
import useEnrollmentCalls from "../service/useEnrollmentCalls";
import useAssignmentCalls from "../service/useAssignmentCalls";

const Students = () => {
  const dispatch = useDispatch();
  const { getStudents, updateUserCall, removeUser } = useUserCalls();
  const { getEnrollmentsByStudent } = useEnrollmentCalls();
  const { getAssignmentsByStudent } = useAssignmentCalls();
  const { users, loading, error } = useSelector(state => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEnrollmentsDialog, setOpenEnrollmentsDialog] = useState(false);
  const [openAssignmentsDialog, setOpenAssignmentsDialog] = useState(false);
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getStudents();
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleViewEnrollments = async () => {
    const data = await getEnrollmentsByStudent(selectedUser._id);
    setEnrollments(data);
    setOpenEnrollmentsDialog(true);
    handleMenuClose();
  };

  const handleViewAssignments = async () => {
    const data = await getAssignmentsByStudent(selectedUser._id);
    setAssignments(data);
    setOpenAssignmentsDialog(true);
    handleMenuClose();
  };

  const handleBanUser = () => {
    setOpenBanDialog(true);
  };

  const handleDeleteUser = () => {
    setOpenDeleteDialog(true);
  };

  const handleBanConfirm = async () => {
    await dispatch(updateUserCall({ ...selectedUser, isActive: false }));
    handleMenuClose();
    setOpenBanDialog(false);
    getStudents();
  };

  const handleUnbanUser = async () => {
    await dispatch(updateUserCall({ ...selectedUser, isActive: true }));
    handleMenuClose();
    getStudents();
  };

  const handleDeleteConfirm = async () => {
    await dispatch(removeUser(selectedUser._id));
    handleMenuClose();
    setOpenDeleteDialog(false);
    getStudents();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div>
      <h1>Öğrenciler</h1>
      <TextField
        label="Öğrenci Aratın"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          marginBottom: "30px"
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>İsim</TableCell>
              <TableCell>Soyisim</TableCell>
              <TableCell>Hareketler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user._id}>
                <TableCell style={{ backgroundColor: user.isActive ? 'inherit' : 'red', width: "20px" }}></TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, user)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleViewEnrollments}>Kayıtlı Olduğu Kurslar</MenuItem>
                    <MenuItem onClick={handleViewAssignments}>Ödevleri</MenuItem>
                    {user.isActive ? (
                      <MenuItem onClick={handleBanUser}>Öğrenciyi Banla</MenuItem>
                    ) : (
                      <MenuItem onClick={handleUnbanUser}>Banı Aç</MenuItem>
                    )}
                    <MenuItem onClick={handleDeleteUser}>Öğrenciyi Sil</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEnrollmentsDialog} onClose={() => setOpenEnrollmentsDialog(false)}>
        <DialogTitle>Kayıtlı Olduğu Kurslar</DialogTitle>
        <DialogContent>
          {enrollments.length ? (
            enrollments.map(enrollment => (
              <p key={enrollment._id}>{enrollment.courseId.courseName}</p>
            ))
          ) : (
            <p>Kayıtlı olduğu kurs bulunmamaktadır.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEnrollmentsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAssignmentsDialog} onClose={() => setOpenAssignmentsDialog(false)}>
        <DialogTitle>Ödevleri</DialogTitle>
        <DialogContent>
          {assignments.length ? (
            assignments.map(assignment => (
              <p key={assignment._id}>{assignment.taskContent}</p>
            ))
          ) : (
            <p>Ödev bulunmamaktadır.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBanDialog} onClose={() => setOpenBanDialog(false)}>
        <DialogTitle>Öğrenciyi Banla</DialogTitle>
        <DialogContent>Bu öğrenciyi banlamak istediğinize emin misiniz?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBanDialog(false)}>Cancel</Button>
          <Button onClick={handleBanConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Öğrenciyi Sil</DialogTitle>
        <DialogContent>Bu öğrenciyi silmek istediğinize emin misiniz?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Students;
