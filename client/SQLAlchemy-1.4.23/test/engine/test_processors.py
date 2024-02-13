from sqlalchemy.testing import assert_raises_message
from sqlalchemy.testing import eq_
from sqlalchemy.testing import fixtures
from sqlalchemy.testing import mock


class _BooleanProcessorTest(fixtures.TestBase):
    def test_int_to_bool_none(self):
        eq_(self.module.int_to_boolean(None), None)

    def test_int_to_bool_zero(self):
        eq_(self.module.int_to_boolean(0), False)

    def test_int_to_bool_one(self):
        eq_(self.module.int_to_boolean(1), True)

    def test_int_to_bool_positive_int(self):
        eq_(self.module.int_to_boolean(12), True)

    def test_int_to_bool_negative_int(self):
        eq_(self.module.int_to_boolean(-4), True)


class CBooleanProcessorTest(_BooleanProcessorTest):
    __requires__ = ("cextensions",)

    @classmethod
    def setup_test_class(cls):
        from sqlalchemy import cprocessors

        cls.module = cprocessors


class _DateProcessorTest(fixtures.TestBase):
    def test_date_no_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse date string '2012' - value is not a string",
            self.module.str_to_date,
            2012,
        )

    def test_datetime_no_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse datetime string '2012' - value is not a string",
            self.module.str_to_datetime,
            2012,
        )

    def test_time_no_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse time string '2012' - value is not a string",
            self.module.str_to_time,
            2012,
        )

    def test_date_invalid_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse date string: '5:a'",
            self.module.str_to_date,
            "5:a",
        )

    def test_datetime_invalid_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse datetime string: '5:a'",
            self.module.str_to_datetime,
            "5:a",
        )

    def test_time_invalid_string(self):
        assert_raises_message(
            ValueError,
            "Couldn't parse time string: '5:a'",
            self.module.str_to_time,
            "5:a",
        )


class PyDateProcessorTest(_DateProcessorTest):
    @classmethod
    def setup_test_class(cls):
        from sqlalchemy import processors

        cls.module = type(
            "util",
            (object,),
            dict(
                (k, staticmethod(v))
                for k, v in list(processors.py_fallback().items())
            ),
        )


class CDateProcessorTest(_DateProcessorTest):
    __requires__ = ("cextensions",)

    @classmethod
    def setup_test_class(cls):
        from sqlalchemy import cprocessors

        cls.module = cprocessors


class _DistillArgsTest(fixtures.TestBase):
    def test_distill_none(self):
        eq_(self.module._distill_params(mock.Mock(), None, None), [])

    def test_distill_no_multi_no_param(self):
        eq_(self.module._distill_params(mock.Mock(), (), {}), [])

    def test_distill_dict_multi_none_param(self):
        eq_(
            self.module._distill_params(mock.Mock(), None, {"foo": "bar"}),
            [{"foo": "bar"}],
        )

    def test_distill_dict_multi_empty_param(self):
        eq_(
            self.module._distill_params(mock.Mock(), (), {"foo": "bar"}),
            [{"foo": "bar"}],
        )

    def test_distill_single_dict(self):
        eq_(
            self.module._distill_params(mock.Mock(), ({"foo": "bar"},), {}),
            [{"foo": "bar"}],
        )

    def test_distill_single_list_strings(self):
        eq_(
            self.module._distill_params(mock.Mock(), (["foo", "bar"],), {}),
            [["foo", "bar"]],
        )

    def test_distill_single_list_tuples(self):
        eq_(
            self.module._distill_params(
                mock.Mock(), ([("foo", "bar"), ("bat", "hoho")],), {}
            ),
            [("foo", "bar"), ("bat", "hoho")],
        )

    def test_distill_single_list_tuple(self):
        eq_(
            self.module._distill_params(mock.Mock(), ([("foo", "bar")],), {}),
            [("foo", "bar")],
        )

    def test_distill_multi_list_tuple(self):
        eq_(
            self.module._distill_params(
                mock.Mock(), ([("foo", "bar")], [("bar", "bat")]), {}
            ),
            ([("foo", "bar")], [("bar", "bat")]),
        )

    def test_distill_multi_strings(self):
        eq_(
            self.module._distill_params(mock.Mock(), ("foo", "bar"), {}),
            [("foo", "bar")],
        )

    def test_distill_single_list_dicts(self):
        eq_(
            self.module._distill_params(
                mock.Mock(), ([{"foo": "bar"}, {"foo": "hoho"}],), {}
            ),
            [{"foo": "bar"}, {"foo": "hoho"}],
        )

    def test_distill_single_string(self):
        eq_(self.module._distill_params(mock.Mock(), ("arg",), {}), [["arg"]])

    def test_distill_multi_string_tuple(self):
        eq_(
            self.module._distill_params(mock.Mock(), (("arg", "arg"),), {}),
            [("arg", "arg")],
        )


class PyDistillArgsTest(_DistillArgsTest):
    @classmethod
    def setup_test_class(cls):
        from sqlalchemy.engine import util

        cls.module = util
