import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Mypage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Toolbar />
      <Typography paragraph>
        社会変革をリードする大学へ
        世界は、地球温暖化、パンデミック、飢餓、資源の枯渇、災害、高齢化をはじめとして多様で深刻な課題に直面し、閉塞感に覆われています。
        大阪大学は、深刻な社会課題の解決に果敢に取り組むため、新たな知と人材と最新のテクノロジーを導入して社会の閉塞感を打破し、
        様々な社会システム変革を通して「いのち」と「くらし」を守るための強靭で持続可能な未来社会を創造する教育研究を推進し、
        社会変革をリードする大学となります。
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </Box>
  );
};

export default Mypage;
