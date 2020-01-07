require 'test_helper'

class IndexTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "visit index page" do 
    get "/"
    # top menu
    assert_select "ul.top-menu" do |elements|
      elements.each do |element|
        assert_select element, "li", 5
      end
    end
    # h1 element
    assert_select "h1", "The Tour"

  end


end
