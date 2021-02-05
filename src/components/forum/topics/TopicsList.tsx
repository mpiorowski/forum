import Icon from "@ant-design/icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Menu, Table } from "antd";
import React from "react";
import { Category, Topic } from "../_common/forumTypes";

interface Props {
  category: Category;
  topics: Topic[];
}

export const TopicsList = ({ category, topics }: Props) => {
  console.log(topics);
  console.log(category);
  const columns = [
    {
      title: "Temat",
      dataIndex: "topicTitle",
      key: "topicTitle",
      sorter: (a, b) => a.topicTitle.localeCompare(b.topicTitle),
      // render: (text, row, index) => {
      // return <NavLink to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts"}>{text}</NavLink>;
      // },
    },
    {
      title: "Posty",
      dataIndex: "postsCount",
      key: "postsCount",
      sorter: (a, b) => a.postsCount - b.postsCount,
    },
    {
      title: "Najnowszy",
      dataIndex: "latestPostDate",
      key: "newest",
      sorter: (a, b) => {
        // let startDate = a.latestPostDate ? moment(a.latestPostDate) : moment(0);
        // let endDate = b.latestPostDate ? moment(b.latestPostDate) : moment(0);
        // return startDate.diff(endDate);
      },
      // render: (text, row, index) => {
      //   return text
      //     ? ""
      //     : // <NavLink
      //       //   to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts?latest=" + row.latestPostUid}
      //       // >
      //       //   {moment(text).fromNow()}
      //       // </NavLink>
      //       "Brak postów";
      // },
    },
  ];

  return (
    <div>
      {/*//todo - edit category only for author*/}
      <div className={"topic-header"}>
        <div className={"topic-header-text"}>
          <div style={{color: "black"}}>{category.title}</div>
          <div className={"topic-header-description"}>{category.description}</div>
        </div>
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  // editCategory(category)
                }}
                key="1"
              >
                Edytuj
              </Menu.Item>
            </Menu>
          }
        >
          <Button className={"topic-more-btn"} type={"link"}>
            <Icon type="more" />
          </Button>
        </Dropdown>
      </div>

      <Table
        columns={columns}
        dataSource={topics}
        size="middle"
        // loading={loading}
        className={"topic-table"}
        rowKey={(record) => record.uid}
        // pagination={{ pageSize: paginationSize }}
      />
      {/* <DrawerComponent
        drawerData={drawerData}
        categoryUid={categoryUid}
        handleDrawerVisible={handleDrawerVisible}
        handleSubmitDrawer={handleSubmitDrawer}
      /> */}
    </div>
  );
};
